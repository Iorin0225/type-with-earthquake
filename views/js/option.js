function change_switch(key, value) {
  chrome.storage.sync.set({
    [key]: value
  })
}


document.getElementById('enabled').addEventListener('change', function(e){
  console.log(this.checked)
  change_switch('enabled', this.checked)
})


// Restores select box and checkbox state using the preferences
// stored in chrome.storage.
function restore_options() {
  // Use default value color = 'red' and likesColor = true.
  chrome.storage.sync.get({
    enabled: true
  }, function(items) {
    document.getElementById('enabled').checked = items.enabled;
  });
}
document.addEventListener('DOMContentLoaded', restore_options);
