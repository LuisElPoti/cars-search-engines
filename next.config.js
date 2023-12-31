/** @type {import('next').NextConfig} */
module.exports = {
  reactStrictMode: true,
  future: {
    webpack5: true,
  },
  api: {
    externalResolver: true,
  },
  images: {
    domains: ['cdn.imagin.studio', 'lh3.googleusercontent.com']

  }
};