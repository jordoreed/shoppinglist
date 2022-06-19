type ServerConfig = {};

const dev: ServerConfig = {};

const prod: ServerConfig = {};

export const config = process.env.NODE_ENV === 'production' ? prod : dev;
