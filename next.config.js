/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  output: 'export',
  // esta será la ruta con la que se reescribirán los enlaces 
  basePath: '/music-project-spotify-clone',
  trailingSlash: true,
  images: {
    unoptimized: true
  }
}

module.exports = nextConfig