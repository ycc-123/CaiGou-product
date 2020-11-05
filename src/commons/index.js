
export const getParamsString = (name) => {
      // 获取URL中的code
      var reg = new RegExp('(^|&)' + name + '=([^&]*)(&|$)', 'i');
      var r = window.location.search.substr(1).match(reg);
      if (r != null) {
        // console.log('code===', unescape(r[2]))
        return unescape(r[2]);
      }
      return null;
    }