export function handleSubmit() {
    console.log('submot')
  const response = fetch('api/submit')
        .then(() => {console.log('data')})
        .catch(() => { console.log('error')});
        console.log('response', response)
}