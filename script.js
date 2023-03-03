const urlForm = document.querySelector("#url-form");
const submitButton = document.querySelector("#url-form > [type='submit']");
const output = document.querySelector("#call-result");

// Attach submit listener
urlForm.addEventListener('submit', async (e) => {
    e.preventDefault();

    // Get URL
    const formData = new FormData(e.target);
    const url = formData.get("url");

    // Result
    let result = "";

    // Make call
    try {
        _setButtonLoadingStatus(true);
        const res = await fetch(url, { mode: "cors" });
        result = `${res.status}-${res.statusText}\n\n${await res.text()}`;
    } catch (e) {
        result = `ERROR\n\n${e.message}`;
    } finally {
        _setButtonLoadingStatus(false);
    }

    // Output result
    output.innerText = result;
});

// HELPERS

function _setButtonLoadingStatus(statusToSet) {
    if (statusToSet) {
        const attribute = document.createAttribute("disabled");
        attribute.value = statusToSet.toString();
        submitButton.attributes.setNamedItem(attribute);
    } else {
        submitButton.attributes.removeNamedItem("disabled");
    }
}