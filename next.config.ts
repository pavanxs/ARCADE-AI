import type { NextConfig } from "next";

const nextConfig: NextConfig = {
	/* config options here */
	output: 'export', // Feel free to modify/remove this option

	// Override the default webpack configuration
	webpack: (config) => {

    config.resolve.alias = {
			...config.resolve.alias,
			sharp$: false,
			'onnxruntime-node$': false,
		};
		return config;
	},
};

export default nextConfig;
