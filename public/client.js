document.addEventListener('DOMContentLoaded', () => {
  const imgUpload = document.getElementById('idIMG')
  const bttnState = document.getElementById('scanIMG')
  console.log(imgUpload)
  imgUpload.addEventListener('change', () => {

    bttnState.disabled = !imgUpload.files.length 
  })
  bttnState.addEventListener('click', (e) => {
    scanIMG()
  })

  function scanIMG(){
    const id = imgUpload.files[0]
    const formData = new FormData()
    formData.append('id', id)
    document.getElementById('test').innerHTML = formData.get('id').name
    fetch('/api/verify-id',{
        method: 'POST',
        body: formData
    })
    .then(res => res.json())
    .then(data => {
        console.log(data)
    })

  }

})
