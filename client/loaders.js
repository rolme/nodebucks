const JSLoader = {
  test: /\.(js|jsx)$/,
  exclude: /node_modules/,
  use: {
    loader: 'babel-loader',
    options: {
      presets: ['env'],
      plugins: ['transform-class-properties']
    }
  }
};

const CSSLoader = {
  test: /\.css$/, 
  use: 'css-loader' 
};

const FileLoader = {
   test: /\.(png|svg|jpg|gif|eot|ttf)$/,
   use: [
    'file-loader'
   ]
};

module.exports = {
  JSLoader: JSLoader,
  CSSLoader: CSSLoader,
  FileLoader: FileLoader
};