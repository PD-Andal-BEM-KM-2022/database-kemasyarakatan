export type post = {
  _id: string;
  title: string;
  content: string;
  img: [string];
  contact: contact;
  views: number;
  createdAt: string;
  updatedAt: string;
  metadata: {
    tags: [string];
    categories: [string];
  };
  comments: [commentType];
};

export type contact = {
  name: string;
  email: string;
  phone: string;
  instagram: string;
  facebook: string;
  twitter: string;
  line: string;
};


export type commentType = {
  _id: string;
  comment: string;
  createdAt: string;
};

export type postReq = {
  title: string;
  content: string;
  img: [string];
  contact: {
    name: string;
    email: string;
    phone: string;
    instagram: string;
    facebook: string;
    twitter: string;
    line: string;
  };
  keywords: [string];
  categories: [string];
};

export type postDeleteReq = {
  id: string;
};

export type postUpdateReq = {
  id: string;
  title: string;
  content: string;
  img: [string];
  contact: {
    name: string;
    email: string;
    phone: string;
    instagram: string;
    facebook: string;
    twitter: string;
    line: string;
  };
  keywords: [string];
  categories: [string];
};

export type postUpdateViewsReq = {
  id: string;
};
