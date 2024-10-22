type AdditionalParam = {
  url: string;
  title: {};
}

export type Action = {
    title: string;
    href: string;
    $: AdditionalParam;
  }

export type Image = {
    title: string;
    filename: string;
    uid: string;
    url: string;
    $: AdditionalParam;
  }