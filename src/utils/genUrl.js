function generate() {
  const args = [].slice.call(arguments);
  const options = args.shift();
  let url = options.url;
  const paramHolders = url.match(new RegExp(url.replacement, 'g'));

  paramHolders.forEach(function(param, idx) {
    if (args[idx]) {
      url = options.prefix + url.replace(options.replacement, args[idx]);
    } else {
      url = options.prefix + url.replace(options.replacement, '');
    }
  });

  return url;
}

export default function genUrl(urls = {}, replacement = '{id}', prefix = '') {
  const obj = {};

  Object.keys(urls).forEach(function(key) {
    obj[key] = generate.bind(undefined, {
      url: urls[key],
      replacement,
      prefix
    });
  });

  return obj;
}
