function sizeStyling()
{
    aspectRatio = window.innerWidth / window.innerHeight;
    if (aspectRatio <= 1 || window.innerWidth <= 1000)
    {
        // maximize space on mobile devices
        const mainContent = document.getElementById("main");
        mainContent.style.width = "100%";
    }
    else
    {
        const mainContent = document.getElementById("main");
        mainContent.style.width = `60%`;    
    }
}

function main()
{
    sizeStyling();
}

function removeLoading()
{
    let loadingContainer = document.getElementById("loading_container");
    loadingContainer.parentNode.removeChild(loadingContainer);
}

window.addEventListener("resize", sizeStyling);
window.addEventListener("load", removeLoading);