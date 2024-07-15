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

window.addEventListener("resize", sizeStyling);