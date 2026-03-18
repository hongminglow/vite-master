export default {
  multipass: true,
  js2svg: {
    pretty: false,
  },
  plugins: [
    {
      name: 'preset-default',
    },
    'removeDimensions',
    'removeScripts',
  ],
}
