export function isError(v: any): boolean {
  return Object.prototype.toString.call(v) === '[object Error]';
}

export function isFunction(v: any): boolean {
  return Object.prototype.toString.call(v) === '[object Function]';
}

export function isArray(v: any): boolean {
  return Object.prototype.toString.call(v) === '[object Array]';
}

export function isFile(v: any): boolean {
  return Object.prototype.toString.call(v) === '[object File]';
}

export function isBlob(v: any): boolean {
  return Object.prototype.toString.call(v) === '[object Blob]';
}

export function isObject(v: any): boolean {
  return Object.prototype.toString.call(v) === '[object Object]';
}

export function isImage(v: any): boolean {
  return Object.prototype.toString.call(v) === '[object HTMLImageElement]';
}

export function isFileLike(v: any): boolean {
  return isFile(v) || isBlob(v);
}
