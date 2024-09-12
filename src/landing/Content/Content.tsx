import "./Content.css";

interface ContentProps {
    title: string;
    content: string;
    image: string;
}

function Content(props: ContentProps) {
    return <>
        <section className="content">
            <div className="left">
                <div className="title">{props.title}</div>
                <div className="text">{props.content}</div>
                <button>EXPLORE</button>
            </div>
            <div className="right">
                <img src={"images/" + props.image} alt="content" />
            </div>
        </section>
    </>
}

export default Content;