
export type UserStatusDto = {
  isOnline: boolean;
  userCompanyId: string;
};
export type ChatMessageDto = {
  userCompanyId: string;
  roomId?: string;
  clientToken?: string;
  text?: string;
};

export type TypingProgressDto = {
  userCompanyId: string;
  roomId?: string;
  clientToken?: string;
};

export type UnseenMessageCountInfoDto = {
  unreadMessages: string;
};
export type SocketClientLocationDto = {
  userCompanyId: string;
  status: boolean;
  time: string;
  location: {
    lat: string;
    lng: string;
  };
};

export type SocketClientPathDto = {
  status: boolean;
  data: {
    userCompanyId: string;
    path: string;
    device: string;
    userAgent: string;
  };
};

export type SocketOrderbookSectionDataDto = {
  ask: [
    string, // price
    string, // amount
    string // total
  ][];
  bid: [
    string, // price
    string, // amount
    string // total
  ][];
  lastTrade: string;
  totalAsk: string;
  totalBid: string;
  minPrice?: string;
  maxPrice?: string;
  totalAmount?: string;
  marketChange?: string;
};

export type SocketTradeSectionDataDto = [
  string, // id
  string, // price
  string, // amount
  string, // createdAt
  string // type
];
