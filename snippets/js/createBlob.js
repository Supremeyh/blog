// 创建blob对象, 下载excel、xls、doc、pdf等

function createBlob(res, name, type = 'xls') {
  type = type.toLowerCase()
  let mimetypes = _mimetypes.xls_xlsx
  if (type === 'doc') {
    mimetypes = _mimetypes.doc
  }
  let blob = new Blob([res.data], {type: mimetypes})
  let objectElement = document.createElement('a')
  objectElement.href = window.URL.createObjectURL(blob)
  objectElement.download = name + '.' + type
  document.body.appendChild(objectElement)
  objectElement.click()
  document.body.removeChild(objectElement) // 下载完成移除元素
  window.URL.revokeObjectURL(objectElement.href) // 释放掉blob对象
}


// 常见 mimetypes
const _mimetypes = {
  // xls
  // xls: "application/vnd.ms-excel",
  // xlsx: "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet;charset=utf-8'",
  xls: "application/vnd.ms-excel,application/vnd.openxmlformats-officedocument.spreadsheetml.sheet;charset=utf-8'",
  // doc
  doc: "application/msword;charset=utf-8",
  // pdf
  pdf: "application/pdf;charset=utf-8"
}


// 注意配合axios设置responseType: 'blob',  axios({ method: 'get', url, responseType: 'blob' })

export default createBlob