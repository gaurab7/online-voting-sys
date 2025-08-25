document.addEventListener('DOMContentLoaded', () => {
  const imgUpload = document.getElementById('idIMG')
  const bttnState = document.getElementById('scanIMG')

  imgUpload.addEventListener('change', () => {
    bttnState.disabled = !imgUpload.files.length
    console.log(imgUpload.files.length)
  })

})