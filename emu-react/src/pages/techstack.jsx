import Pagecard from "./card-page"

function Tech(){
    return(
        <div className="flex   relative  w-screen  bg-cover bg-center justify-center items-start gap-10 px-4"
           >
            <Pagecard cardimage={"https://images.icon-icons.com/2415/PNG/512/postgresql_plain_wordmark_logo_icon_146390.png"}
            />
            <Pagecard cardimage={"https://images.seeklogo.com/logo-png/42/2/prisma-logo-png_seeklogo-428631.png"}/>
            <Pagecard cardimage={"https://upload.wikimedia.org/wikipedia/commons/thumb/d/d9/Node.js_logo.svg/640px-Node.js_logo.svg.png"}/>
            <Pagecard cardimage={"https://images.tute.io/media/topics/icons/express-js.png"}/>
            <Pagecard cardimage={"https://images.icon-icons.com/2415/PNG/512/react_original_wordmark_logo_icon_146375.png"}/>
            <Pagecard cardimage={"https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcT4TCk7NZppGt-ZkqmLnGcO4E0VPSy4HeoI7A&s"}/>
            <Pagecard cardimage={"https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSnG6N_SAABvc99uhpvkvpXpVDZyuX0Nyaeag&s"}/>
            <Pagecard cardimage={"https://upload.wikimedia.org/wikipedia/commons/thumb/d/d5/Tailwind_CSS_Logo.svg/2560px-Tailwind_CSS_Logo.svg.png"}/>
        </div>
    )
}
export default Tech