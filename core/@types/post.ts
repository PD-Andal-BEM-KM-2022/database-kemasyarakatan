export type post = {
  title: string;
  content: string[];
  img: [string];
  contact: contact;
  views: number;
  createdAt: string;
  updatedAt: string;
  metadata: {
    tags: string[];
  };
  location: string;
  category: string;
  comments: [];
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
  content: string[];
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
  location: string;
  keywords: string[];
  category: string;
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
  category: [string];
};

export type postUpdateViewsReq = {
  id: string;
};

export type categoryType = {
  _id: string;
  name: string;
  countObject: number;
};
