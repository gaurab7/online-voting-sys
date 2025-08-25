document.addEventListener('DOMContentLoaded', () => {
  const imgUpload = document.getElementById('idIMG')
  const bttnState = document.getElementById('scanIMG')
  console.log(imgUpload)
  imgUpload.addEventListener('change', () => {

    bttnState.disabled = !imgUpload.files.length 
  })

})
 console.log('ok')