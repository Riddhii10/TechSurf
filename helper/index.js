import Stack from '../contentstack-sdk';
import { addEditableTags } from '@contentstack/utils';
import getConfig from 'next/config';
import axios from 'axios';

const { publicRuntimeConfig } = getConfig();
const envConfig = process.env.CONTENTSTACK_API_KEY
  ? process.env
  : publicRuntimeConfig;
console.log(envConfig);
console.log(publicRuntimeConfig);
const liveEdit = envConfig.CONTENTSTACK_LIVE_EDIT_TAGS === 'true';
const BASE_URL = "https://"+envConfig.CONTENTSTACK_API_HOST || 'https://eu-api.contentstack.com';

const API_KEY = envConfig.CONTENTSTACK_API_KEY || envConfig.NEXT_PUBLIC_CONTENTSTACK_API_KEY;
const DELIVERY_TOKEN = envConfig.CONTENTSTACK_DELIVERY_TOKEN;
const ENVIRONMENT = envConfig.CONTENTSTACK_ENVIRONMENT;
const MANAGEMENT_TOKEN = envConfig.CONTENTSTACK_MANAGEMENT_TOKEN


export const getHeaderRes = async () => {
  const response = await Stack.getEntry({
    contentTypeUid: 'header',
    referenceFieldPath: ['navigation_menu.page_reference'],
    jsonRtePath: ['notification_bar.announcement_text'],
  });

  liveEdit && addEditableTags(response[0][0], 'header', true);
  return response[0][0];
};

export const getFooterRes = async () => {
  const response = await Stack.getEntry({
    contentTypeUid: 'footer',
    referenceFieldPath: undefined,
    jsonRtePath: ['copyright'],
  });
  liveEdit && addEditableTags(response[0][0], 'footer', true);
  return response[0][0];
};

export const getAllEntries = async () => {
  const response = await Stack.getEntry({
    contentTypeUid: 'page',
    referenceFieldPath: undefined,
    jsonRtePath: undefined,
  });
  liveEdit &&
    response[0].forEach((entry) => addEditableTags(entry, 'page', true));
  return response[0];
};

export const getPageRes = async (entryUrl) => {
  console.log(entryUrl);
  const response = await Stack.getEntryByUrl({
    contentTypeUid: 'page',
    entryUrl,
    referenceFieldPath: ['page_components.from_blog.featured_blogs'],
    jsonRtePath: [
      'page_components.from_blog.featured_blogs.body',
      'page_components.section_with_buckets.buckets.description',
      'page_components.section_with_html_code.description',
    ],
  });
  liveEdit && addEditableTags(response[0], 'page', true);

  console.log(response[0]);
  return response[0];
};

export const getBlogListRes = async () => {
  const response = await Stack.getEntry({
    contentTypeUid: 'blog_post',
    referenceFieldPath: ['author', 'related_post'],
    jsonRtePath: ['body'],
  });
  liveEdit &&
    response[0].forEach((entry) => addEditableTags(entry, 'blog_post', true));
  console.log(response[0]);
  return response[0];
};

export const getBlogPostRes = async (entryUrl) => {
  const response = await Stack.getEntryByUrl({
    contentTypeUid: 'blog_post',
    entryUrl,
    referenceFieldPath: ['author', 'related_post'],
    jsonRtePath: ['body', 'related_post.body'],
  });
  liveEdit && addEditableTags(response[0], 'blog_post', true);
  console.log(response[0]);
  return response[0];
};


//added by me 
export const getContentTypesRes = async ({ limit = 10, skip = 0, search } = {}) => {
  console.log(BASE_URL);
  try {
    const response = await axios.get(`${BASE_URL}/v3/content_types`, {
      headers: {
        api_key: API_KEY,
        access_token: DELIVERY_TOKEN,
        authorization: MANAGEMENT_TOKEN
      },
    });

    console.log('Fetched Content Types:', response.data.content_types);
    return response.data.content_types.map(contentType => ({
      title: contentType.title,
      uid: contentType.uid,
    }));
  } catch (error) {
    console.error('Error fetching content types:', error);
    throw error;
  }
};

export const getSpecificContentTypeRes = async (content_type_uid) =>{
  try{
    const response = await axios.get(`${BASE_URL}/v3/content_types/${content_type_uid}/`, {
      headers: {
        api_key: API_KEY,
        access_token: DELIVERY_TOKEN,
        authorization: MANAGEMENT_TOKEN
      },
    });

    return response.data.content_type;
  }
  catch (error){
    console.error('Error fetching specific content type:', error);
    throw error;
  }
};

export const getSpecificEntry = async (content_type_uid,entry_uid) =>{
  try{
    const response = await axios.get(`${BASE_URL}/v3/content_types/${content_type_uid}/entries/${entry_uid}/`, {
      headers: {
        api_key: API_KEY,
        access_token: DELIVERY_TOKEN,
        authorization: MANAGEMENT_TOKEN
      },
    });

    return response.data.entry;
  }
  catch (error){
    console.error();
    throw error;
  }
};

export const createEntry = async (content_type_uid,data) => { 
  console.log(data);
  try {
    const response = await axios.post(
      `${BASE_URL}/v3/content_types/${content_type_uid}/entries/`,
      {
        entry: data
      },
      {
        headers: {
          api_key: API_KEY,
          access_token: DELIVERY_TOKEN,
          authorization: MANAGEMENT_TOKEN,
          'Content-Type': 'application/json'
        },
      }
    );
    return response; // handle what to return 
  } catch (error) {
    console.error('Error creating entry:', error);
    throw error;
  }
};

export const updateEntry = async (content_type_uid,entryUid, data) => {
  console.log(entryUid,data);
  try {
    const response = await axios.put(
      `${BASE_URL}/v3/content_types/${content_type_uid}/entries/${entryUid}`,
      {
        entry: data
      },
      {
        headers: {
          api_key: API_KEY,
          access_token: DELIVERY_TOKEN,
          authorization: MANAGEMENT_TOKEN,
          'Content-Type': 'application/json'
        },
      }
    );
    return response.data.entry;
  } catch (error) {
    console.error('Error updating entry:', error);
    throw error;
  }
};

export const deleteEntry = async (content_type_uid,entryUid) => {
  try {
    const response = await axios.delete(
      `${BASE_URL}/v3/content_types/${content_type_uid}/entries/${entryUid}`,
      
      {
        headers: {
          api_key: API_KEY,
          access_token: DELIVERY_TOKEN,
          authorization: MANAGEMENT_TOKEN,
          'Content-Type': 'application/json'
        },
      }
    );
    return response.data;
  } catch (error) {
    console.error('Error deleting entry:', error);
    throw error;
  }
};

export const publishEntry = async (content_type_uid,entryUid) => {
  try {
    const requestBody = {
      entry: {
        environments: ["development"],
        locales: ["en-us"],
      },
    };
    const response = await axios.post(
      `${BASE_URL}/v3/content_types/${content_type_uid}/entries/${entryUid}/publish`,
      requestBody,
      {
        headers: {
          api_key: API_KEY,
          access_token: DELIVERY_TOKEN,
          authorization: MANAGEMENT_TOKEN,
          'Content-Type': 'application/json'
        },
      }
    );
    return response;
  } catch (error) {
    console.error('Error deleting entry:', error);
    throw error;
  }
};

export const getImages = async () => {
  try {
    const response = await axios.get(`${BASE_URL}/v3/assets`, {
      headers: {
        api_key: API_KEY,
        access_token: DELIVERY_TOKEN,
        authorization: MANAGEMENT_TOKEN
      },
    });
    return response;
  } catch (error) {
    console.error('Error getting images:', error);
    throw error;
  }
};




