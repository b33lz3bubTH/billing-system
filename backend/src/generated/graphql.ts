export type Maybe<T> = T | null;
export type InputMaybe<T> = Maybe<T>;
export type Exact<T extends { [key: string]: unknown }> = { [K in keyof T]: T[K] };
export type MakeOptional<T, K extends keyof T> = Omit<T, K> & { [SubKey in K]?: Maybe<T[SubKey]> };
export type MakeMaybe<T, K extends keyof T> = Omit<T, K> & { [SubKey in K]: Maybe<T[SubKey]> };
export type MakeEmpty<T extends { [key: string]: unknown }, K extends keyof T> = { [_ in K]?: never };
export type Incremental<T> = T | { [P in keyof T]?: P extends ' $fragmentName' | '__typename' ? T[P] : never };
/** All built-in and custom scalars, mapped to their actual values */
export type Scalars = {
  ID: { input: string; output: string; }
  String: { input: string; output: string; }
  Boolean: { input: boolean; output: boolean; }
  Int: { input: number; output: number; }
  Float: { input: number; output: number; }
  JSON: { input: any; output: any; }
};

export type BaseFields = {
  _id: Scalars['ID']['output'];
  createdAt: Scalars['String']['output'];
  createdBy: Scalars['String']['output'];
  deletedAt?: Maybe<Scalars['String']['output']>;
  deletedBy?: Maybe<Scalars['String']['output']>;
  updatedAt: Scalars['String']['output'];
  updatedBy: Scalars['String']['output'];
};

export type Mutation = {
  __typename?: 'Mutation';
  createProducts?: Maybe<Products>;
  createSellers?: Maybe<Sellers>;
};


export type MutationCreateProductsArgs = {
  data: ProductCreateInput;
};


export type MutationCreateSellersArgs = {
  data: SellerCreateInput;
};

export type Object_Id = {
  __typename?: 'OBJECT_ID';
  _solid_id?: Maybe<Scalars['String']['output']>;
};

export type PaginatedProducts = {
  __typename?: 'PaginatedProducts';
  count: Scalars['Int']['output'];
  data?: Maybe<Array<Maybe<Products>>>;
};

export type PaginatedSellers = {
  __typename?: 'PaginatedSellers';
  count: Scalars['Int']['output'];
  data?: Maybe<Array<Maybe<Sellers>>>;
};

export type ProductCreateInput = {
  available: Scalars['Boolean']['input'];
  medias?: InputMaybe<Array<Scalars['JSON']['input']>>;
  mrp: Scalars['String']['input'];
  name: Scalars['String']['input'];
  postDescription: Scalars['String']['input'];
  sellerId: Scalars['ID']['input'];
  sellingPrice: Scalars['String']['input'];
  tags: Array<Scalars['String']['input']>;
};

export type ProductFilterInput = {
  available?: InputMaybe<Scalars['Boolean']['input']>;
  mrp?: InputMaybe<Scalars['String']['input']>;
  name?: InputMaybe<Scalars['String']['input']>;
  postDescription?: InputMaybe<Scalars['String']['input']>;
  sellerId?: InputMaybe<Scalars['ID']['input']>;
  sellingPrice?: InputMaybe<Scalars['String']['input']>;
  tags?: InputMaybe<Array<Scalars['String']['input']>>;
};

export type Products = BaseFields & {
  __typename?: 'Products';
  _id: Scalars['ID']['output'];
  available: Scalars['Boolean']['output'];
  createdAt: Scalars['String']['output'];
  createdBy: Scalars['String']['output'];
  deletedAt?: Maybe<Scalars['String']['output']>;
  deletedBy?: Maybe<Scalars['String']['output']>;
  medias?: Maybe<Array<Scalars['JSON']['output']>>;
  mrp: Scalars['String']['output'];
  name: Scalars['String']['output'];
  postDescription: Scalars['String']['output'];
  sellerId?: Maybe<SellerIdUnion>;
  sellingPrice: Scalars['String']['output'];
  tags: Array<Scalars['String']['output']>;
  updatedAt: Scalars['String']['output'];
  updatedBy: Scalars['String']['output'];
};

export type Query = {
  __typename?: 'Query';
  fetchProduct?: Maybe<Products>;
  fetchProducts?: Maybe<PaginatedProducts>;
  fetchSeller?: Maybe<Sellers>;
  fetchSellers?: Maybe<PaginatedSellers>;
};


export type QueryFetchProductArgs = {
  _id: Scalars['ID']['input'];
};


export type QueryFetchProductsArgs = {
  filter?: InputMaybe<ProductFilterInput>;
  skip: Scalars['Int']['input'];
  take: Scalars['Int']['input'];
};


export type QueryFetchSellerArgs = {
  _id: Scalars['ID']['input'];
};


export type QueryFetchSellersArgs = {
  filter?: InputMaybe<SellerFilterInput>;
  skip: Scalars['Int']['input'];
  take: Scalars['Int']['input'];
};

export type SellerCreateInput = {
  active: Scalars['Boolean']['input'];
  address: Scalars['String']['input'];
  medias?: InputMaybe<Array<Scalars['JSON']['input']>>;
  name: Scalars['String']['input'];
  phone: Scalars['String']['input'];
};

export type SellerFilterInput = {
  active?: InputMaybe<Scalars['Boolean']['input']>;
  address?: InputMaybe<Scalars['String']['input']>;
  name?: InputMaybe<Scalars['String']['input']>;
  phone?: InputMaybe<Scalars['String']['input']>;
};

export type SellerIdUnion = Object_Id | Sellers;

export type Sellers = BaseFields & {
  __typename?: 'Sellers';
  _id: Scalars['ID']['output'];
  active: Scalars['Boolean']['output'];
  address: Scalars['String']['output'];
  createdAt: Scalars['String']['output'];
  createdBy: Scalars['String']['output'];
  deletedAt?: Maybe<Scalars['String']['output']>;
  deletedBy?: Maybe<Scalars['String']['output']>;
  medias?: Maybe<Array<Scalars['JSON']['output']>>;
  name: Scalars['String']['output'];
  phone: Scalars['String']['output'];
  updatedAt: Scalars['String']['output'];
  updatedBy: Scalars['String']['output'];
};
