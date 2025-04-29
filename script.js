const chat = document.getElementById("_chat");
const jokeBtn = document.getElementById("jokeBtn");

generateJoke();

jokeBtn.addEventListener("click", generateJoke);

async function generateJoke() {
    jokeBtn.disabled = true; // Fix typo

    const message = createMessageElement("Hey robot, tell me a joke!");
    appendMessage(message);

    const joke = createMessageElement();
    setElementContent(joke, '<i class="fa-solid fa-ellipsis"></i>');
    appendMessage(joke);

    try {
        const res = await fetch("https://icanhazdadjoke.com", {
            headers: {
                Accept: "application/json",
            },
        });

        if (res.ok) {
            const data = await res.json();
            console.log(data);
            setElementContent(joke, data.joke);
        } else {
            setElementContent(joke, "Sorry, I couldn't fetch a joke at the moment.");
        }
    } catch (error) {
        console.error(error);
        setElementContent(joke, "An error occurred while fetching the joke.");
    } finally {
        jokeBtn.disabled = false; // Enable the button again
    }
}

function createMessageElement(content) {
    const element = document.createElement("div");
    element.classList.add("message");

    if (content) {
        element.classList.add("response");
        setElementContent(element, content);
    } else {
        element.classList.add("joke");
    }

    return element;
}

function setElementContent(element, content) {
    element.innerHTML = content; // Fix typo
}

function appendMessage(element) {
    chat.appendChild(element); // Fix typo
}
