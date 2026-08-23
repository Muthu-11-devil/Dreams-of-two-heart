/* ==========================================
   ONLINE TEMPLATE LIBRARY
========================================== */
const TEMPLATE_URL =
    "https://raw.githubusercontent.com/Muthu-11-devil/Dreams-of-two-heart/refs/heads/main/templates.jason";


let templates = [];

let selectedTemplate = null;

let proposalData = {
    yourName: "",
    crushName: "",
    years: "",
    firstLove: "",
    customMessage: "",
    proposalText: ""
};

let typingTimer = null;


/* ==========================================
   LOAD ONLINE TEMPLATES
========================================== */

async function loadTemplates() {

    const status =
        document.getElementById("templateStatus");

    try {

        if (
            TEMPLATE_URL.includes(
                "PASTE_YOUR"
            )
        ) {

            status.textContent =
                "⚠️ Add your templates.json Raw URL in script.js";

            return;
        }

        const response =
            await fetch(TEMPLATE_URL);

        if (!response.ok) {

            throw new Error(
                "Template request failed"
            );
        }

        templates =
            await response.json();

        if (!Array.isArray(templates)) {

            throw new Error(
                "Invalid template JSON"
            );
        }

        displayTemplates();

        status.textContent =
            "✨ " +
            templates.length +
            " online templates loaded";

    } catch (error) {

        console.error(error);

        status.textContent =
            "⚠️ Could not load online templates.";
    }
}


/* ==========================================
   DISPLAY TEMPLATES
========================================== */

function displayTemplates() {

    const library =
        document.getElementById(
            "templateLibrary"
        );

    library.innerHTML = "";

    templates.forEach(function(template) {

        const card =
            document.createElement("div");

        card.className =
            "template-card";

        card.dataset.id =
            template.id;

        card.innerHTML = `
            <div class="template-icon">
                ${template.icon || "❤️"}
            </div>

            <div class="template-name">
                ${template.name || "Love Template"}
            </div>

            <div class="template-category">
                ${template.category || "Romantic"}
            </div>
        `;

        card.style.background =
            template.preview ||
            "#fff0f6";

        card.onclick =
            function() {

                selectTemplate(
                    template.id
                );
            };

        library.appendChild(card);
    });
}


/* ==========================================
   SELECT TEMPLATE
========================================== */

function selectTemplate(id) {

    selectedTemplate =
        templates.find(function(template) {

            return template.id === id;
        });


    document
        .querySelectorAll(".template-card")
        .forEach(function(card) {

            card.classList.remove(
                "selected"
            );
        });


    const selected =
        document.querySelector(
            `.template-card[data-id="${id}"]`
        );


    if (selected) {

        selected.classList.add(
            "selected"
        );
    }


    if (selectedTemplate) {

        applyTemplateTheme(
            selectedTemplate.theme
        );
    }
}


/* ==========================================
   APPLY TEMPLATE THEME
========================================== */

function applyTemplateTheme(theme) {

    const themes = [
        "pink",
        "red",
        "purple",
        "blue",
        "gold",
        "night",
        "green",
        "peach",
        "lavender",
        "rose"
    ];

    themes.forEach(function(item) {

        document.body.classList.remove(
            "theme-" + item
        );
    });


    if (themes.includes(theme)) {

        document.body.classList.add(
            "theme-" + theme
        );
    }
}


/* ==========================================
   MUSIC
========================================== */

function toggleMusic() {

    const music =
        document.getElementById(
            "bgMusic"
        );

    const button =
        document.getElementById(
            "musicButton"
        );


    if (!music) {

        alert(
            "Music player was not found."
        );

        return;
    }


    if (music.paused) {

        music.play()
            .then(function() {

                button.textContent =
                    "⏸️ Pause Music";

            })
            .catch(function(error) {

                console.error(
                    "Music playback error:",
                    error
                );

                button.textContent =
                    "🎵 Play Music";

                alert(
                    "Music could not play. Make sure music.mp3 is a real MP3 file in your GitHub repository."
                );
            });

    } else {

        music.pause();

        button.textContent =
            "🎵 Play Music";
    }
}


/* ==========================================
   GENERATE PROPOSAL
========================================== */

function generateProposal() {

    const yourName =
        document.getElementById(
            "yourName"
        ).value.trim();

    const crushName =
        document.getElementById(
            "crushName"
        ).value.trim();

    const years =
        document.getElementById(
            "years"
        ).value.trim();

    const firstLove =
        document.getElementById(
            "firstLove"
        ).value;

    const customMessage =
        document.getElementById(
            "customMessage"
        ).value.trim();


    if (!yourName || !crushName) {

        alert(
            "Please enter both names ❤️"
        );

        return;
    }


    if (!selectedTemplate) {

        alert(
            "Please choose a proposal template first 🎨"
        );

        return;
    }


    proposalData.yourName =
        yourName;

    proposalData.crushName =
        crushName;

    proposalData.years =
        years || "some time";

    proposalData.firstLove =
        firstLove;

    proposalData.customMessage =
        customMessage;


    proposalData.proposalText =
        buildProposalText();


    handlePhoto();


    const message =
        document.getElementById(
            "customMessageDisplay"
        );


    if (customMessage) {

        message.textContent =
            customMessage;

        message.classList.remove(
            "hidden"
        );

    } else {

        message.classList.add(
            "hidden"
        );
    }


    document
        .getElementById(
            "scoreSection"
        )
        .classList.remove(
            "hidden"
        );


    document
        .getElementById(
            "envelopeSection"
        )
        .classList.remove(
            "hidden"
        );


    document
        .getElementById(
            "letterSection"
        )
        .classList.add(
            "hidden"
        );


    animateLoveMeter();


    setTimeout(function() {

        document
            .getElementById(
                "scoreSection"
            )
            .scrollIntoView({
                behavior: "smooth",
                block: "center"
            });

    }, 200);
}


/* ==========================================
   BUILD PROPOSAL
========================================== */

function buildProposalText() {

    const template =
        selectedTemplate;


    let text =
        template.text || "";


    text =
        text.replace(
            /\{name\}/g,
            proposalData.crushName
        );


    text =
        text.replace(
            /\{yourName\}/g,
            proposalData.yourName
        );


    text =
        text.replace(
            /\{years\}/g,
            proposalData.years
        );


    if (
        proposalData.firstLove === "Yes"
    ) {

        text +=
            "\n\nAnd yes... this is my first love, " +
            "which makes this moment even more special. ❤️";
    }


    return text;
}


/* ==========================================
   PHOTO
========================================== */

function handlePhoto() {

    const input =
        document.getElementById(
            "specialPhoto"
        );

    const container =
        document.getElementById(
            "photoContainer"
        );

    const image =
        document.getElementById(
            "proposalPhoto"
        );


    if (
        !input.files ||
        !input.files[0]
    ) {

        container.classList.add(
            "hidden"
        );

        image.removeAttribute(
            "src"
        );

        return;
    }


    const reader =
        new FileReader();


    reader.onload =
        function(event) {

            image.src =
                event.target.result;

            container.classList.remove(
                "hidden"
            );
        };


    reader.readAsDataURL(
        input.files[0]
    );
}


/* ==========================================
   LOVE METER
========================================== */

function animateLoveMeter() {

    const fill =
        document.getElementById(
            "scoreFill"
        );

    const number =
        document.getElementById(
            "scoreNumber"
        );

    const message =
        document.getElementById(
            "scoreMessage"
        );


    const score =
        Math.floor(
            Math.random() * 11
        ) + 90;


    fill.style.width =
        "0%";

    number.textContent =
        "0%";


    let current = 0;


    const timer =
        setInterval(function() {

            current++;

            fill.style.width =
                current + "%";

            number.textContent =
                current + "%";


            if (current >= score) {

                clearInterval(timer);

                message.textContent =
                    "💖 Your love meter is glowing!";
            }

        }, 25);
}


/* ==========================================
   OPEN LETTER
========================================== */

function openLetter() {

    const section =
        document.getElementById(
            "letterSection"
        );

    const text =
        document.getElementById(
            "proposalText"
        );


    section.classList.remove(
        "hidden"
    );


    text.textContent =
        "";

    text.classList.add(
        "typing-cursor"
    );


    typeProposal(
        proposalData.proposalText
    );


    setTimeout(function() {

        section.scrollIntoView({
            behavior: "smooth",
            block: "start"
        });

    }, 150);
}


/* ==========================================
   TYPING EFFECT
========================================== */

function typeProposal(text) {

    const element =
        document.getElementById(
            "proposalText"
        );


    if (typingTimer) {

        clearTimeout(
            typingTimer
        );
    }


    let index = 0;


    function typeNext() {

        if (index >= text.length) {

            element.classList.remove(
                "typing-cursor"
            );

            return;
        }


        element.textContent +=
            text.charAt(index);

        index++;


        let delay = 24;


        if (
            text.charAt(index - 1) === "." ||
            text.charAt(index - 1) === "!" ||
            text.charAt(index - 1) === ","
        ) {

            delay = 100;
        }


        typingTimer =
            setTimeout(
                typeNext,
                delay
            );
    }


    typeNext();
}


/* ==========================================
   LOVE STORY
========================================== */

function generateLoveStory() {

    const meet =
        document.getElementById(
            "meetPlace"
        ).value.trim();

    const memory =
        document.getElementById(
            "favoriteMemory"
        ).value.trim();

    const dream =
        document.getElementById(
            "dreamPlace"
        ).value.trim();

    const story =
        document.getElementById(
            "loveStory"
        );


    if (!meet && !memory && !dream) {

        alert(
            "Add at least one detail first ❤️"
        );

        return;
    }


    let result =
        "✨ Our Little Love Story ✨\n\n";


    if (meet) {

        result +=
            "It all began when we met at " +
            meet +
            ". ";
    }


    if (memory) {

        result +=
            "One of my favorite memories is " +
            memory +
            ". ";
    }


    if (dream) {

        result +=
            "Maybe one day, we can create " +
            "another beautiful memory together " +
            "at " +
            dream +
            ". ";
    }


    result +=
        "\n\nSome stories become special " +
        "because of the people who are part " +
        "of them. ❤️";


    story.textContent =
        result;

    story.classList.remove(
        "hidden"
    );
}


/* ==========================================
   STAR MESSAGES
========================================== */

function starMessage(number) {

    const messages = {

        1:
            "⭐ You make ordinary moments special.",

        2:
            "✨ Someone is thinking about you.",

        3:
            "⭐ Every beautiful story starts somewhere.",

        4:
            "🌟 You are someone's favorite thought.",

        5:
            "✨ Keep this little secret close.",

        6:
            "⭐ Some feelings shine brighter than stars."
    };


    document.getElementById(
        "starMessage"
    ).textContent =
        messages[number];
}


/* ==========================================
   DOWNLOAD
========================================== */

function downloadTxt() {

    if (!proposalData.proposalText) {

        alert(
            "Generate your proposal first ❤️"
        );

        return;
    }


    let text =
        "💕 LOVE PROPOSAL 💕\n\n" +
        proposalData.proposalText;


    if (proposalData.customMessage) {

        text +=
            "\n\n💌 Personal Message:\n\n" +
            proposalData.customMessage;
    }


    const blob =
        new Blob(
            [text],
            {
                type:
                    "text/plain;charset=utf-8"
            }
        );


    const url =
        URL.createObjectURL(blob);


    const link =
        document.createElement("a");


    link.href =
        url;

    link.download =
        "love-proposal.txt";


    document.body.appendChild(link);

    link.click();

    link.remove();

    URL.revokeObjectURL(url);
}


/* ==========================================
   COPY
========================================== */

function copyProposal() {

    if (!proposalData.proposalText) {

        alert(
            "Generate your proposal first ❤️"
        );

        return;
    }


    let text =
        proposalData.proposalText;


    if (proposalData.customMessage) {

        text +=
            "\n\n" +
            proposalData.customMessage;
    }


    if (
        navigator.clipboard &&
        window.isSecureContext
    ) {

        navigator.clipboard
            .writeText(text)
            .then(function() {

                alert(
                    "Proposal copied! 💕"
                );

            })
            .catch(function() {

                fallbackCopy(text);

            });

    } else {

        fallbackCopy(text);
    }
}


/* ==========================================
   FALLBACK COPY
========================================== */

function fallbackCopy(text) {

    const area =
        document.createElement(
            "textarea"
        );

    area.value =
        text;

    document.body.appendChild(
        area
    );

    area.select();

    document.execCommand(
        "copy"
    );

    area.remove();

    alert(
        "Proposal copied! 💕"
    );
}


/* ==========================================
   SHARE
========================================== */

function shareProposal() {

    if (!proposalData.proposalText) {

        alert(
            "Generate your proposal first ❤️"
        );

        return;
    }


    if (navigator.share) {

        navigator.share({

            title:
                "💕 Love Proposal",

            text:
                proposalData.proposalText

        }).catch(function() {});

    } else {

        copyProposal();
    }
}


/* ==========================================
   FEEDBACK
========================================== */

function submitFeedback() {

    const input =
        document.getElementById(
            "feedbackText"
        );

    const message =
        document.getElementById(
            "feedbackMessage"
        );


    if (!input.value.trim()) {

        message.textContent =
            "Please write some feedback first ❤️";

        return;
    }


    message.textContent =
        "Thank you for your feedback! 💕";

    input.value = "";
}


/* ==========================================
   FLOATING HEARTS
========================================== */

function createFloatingHeart() {

    const container =
        document.getElementById(
            "hearts"
        );


    if (!container) {
        return;
    }


    const heart =
        document.createElement(
            "div"
        );


    const symbols = [
        "❤️",
        "💕",
        "💖",
        "💗",
        "💓"
    ];


    heart.className =
        "floating-heart";


    heart.textContent =
        symbols[
            Math.floor(
                Math.random() *
                symbols.length
            )
        ];


    heart.style.left =
        Math.random() * 100 + "%";


    heart.style.fontSize =
        15 +
        Math.random() * 20 +
        "px";


    heart.style.animationDuration =
        4 +
        Math.random() * 4 +
        "s";


    container.appendChild(
        heart
    );


    setTimeout(function() {

        heart.remove();

    }, 8000);
}


/* ==========================================
   START
========================================== */

document.addEventListener(
    "DOMContentLoaded",
    function() {

        loadTemplates();

        setInterval(
            createFloatingHeart,
            900
        );

    }
);
/* ==========================================
   AI LOVE ASSISTANT
========================================== */

async function sendAIMessage() {

    const input =
        document.getElementById("aiChatInput");

    const messages =
        document.getElementById("aiChatMessages");

    const status =
        document.getElementById("aiChatStatus");

    const button =
        document.getElementById("aiSendButton");


    const userText =
        input.value.trim();


    if (!userText) {
        return;
    }


    /* USER MESSAGE */

    const userMessage =
        document.createElement("div");

    userMessage.className =
        "user-message";

    userMessage.innerHTML =
        `<strong>You:</strong>
         <p>${escapeAIText(userText)}</p>`;

    messages.appendChild(userMessage);


    input.value = "";

    messages.scrollTop =
        messages.scrollHeight;


    /* AI RESPONSE */

button.disabled = true;
status.textContent = "💭 Thinking...";

try {
    const response = await fetch(
        "https://dreams-ai-chart.muthupandi2011muthu.workers.dev/",
        {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify({
                message: userText
            })
        }
    );

    const data = await response.json();

    if (!response.ok) {
        throw new Error(data.error || "AI request failed.");
    }

    const aiMessage =
        document.createElement("div");

    aiMessage.className =
        "ai-message";

    aiMessage.innerHTML =
        `<strong>💕 Love Assistant:</strong>
         <p>${escapeAIText(data.reply)}</p>`;

    messages.appendChild(aiMessage);

    messages.scrollTop =
        messages.scrollHeight;

} catch (error) {

    const aiMessage =
        document.createElement("div");

    aiMessage.className =
        "ai-message";

    aiMessage.innerHTML =
        `<strong>💕 Love Assistant:</strong>
         <p>Sorry, I couldn't connect to the AI right now. Please try again.</p>`;

    messages.appendChild(aiMessage);

    messages.scrollTop =
        messages.scrollHeight;
}

button.disabled = false;
status.textContent = "";


/* ==========================================
   SAFE CHAT TEXT
========================================== */

function escapeAIText(text) {

    const div =
        document.createElement("div");

    div.textContent =
        text;

    return div.innerHTML;
}


/* ==========================================
   ENTER TO SEND
========================================== */

document.addEventListener(
    "DOMContentLoaded",
    function() {

        const input =
            document.getElementById(
                "aiChatInput"
            );


        if (!input) {
            return;
        }


        input.addEventListener(
            "keydown",
            function(event) {

                if (
                    event.key === "Enter" &&
                    !event.shiftKey
                ) {

                    event.preventDefault();

                    sendAIMessage();
                }

            }
        );

    }
);