/** @type {import('next').NextConfig} */

import * as path from 'path';

const nextConfig = {
    sassOptions: {
        includePaths: [path.join(process.cwd(), 'styles')],
    },
    images: {
        domains: ['www.pinterest.com', 'res.cloudinary.com', 'i.pinimg.com'],
    },
};

export default nextConfig;
