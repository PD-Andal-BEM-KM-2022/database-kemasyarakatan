export type post = {
  _id: string;
  title: string;
  content: string;
  img: [string];
  contact: contact;
  views: number;
  createdAt: string;
  updatedAt: string;
  tags: {
    keywords: [string];
    categories: [string];
  };
  comment: [comment];
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


export type comment = {
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
