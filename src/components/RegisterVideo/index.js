import React from "react";
import { StyledRegisterVideo } from "./style"
import { createClient } from "@supabase/supabase-js"

// Custom Hook 
function useForm(propsDoForm){
    const [values, setValues] = React.useState(propsDoForm.initialValues);

    return {
        values,
        handleChange: (evento) => {
            const value = evento.target.value;
            const name = evento.target.name;
            console.log(value);
            setValues({
                ...values,
                [name]:value,
            });
        },
        clearForm() {
            setValues({});
        }
    };
}

const PROJECT_URL = "https://quuxgkmoqxxbhsubdfvc.supabase.co";
const PUBLIC_KEY = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InF1dXhna21vcXh4YmhzdWJkZnZjIiwicm9sZSI6ImFub24iLCJpYXQiOjE2Njg0MTg3NjgsImV4cCI6MTk4Mzk5NDc2OH0.ghuB4iqz_rn8Jf6SrX1b0EQL8nvpT_Qjv4bXnCA0vEo";
const supabase = createClient(PROJECT_URL, PUBLIC_KEY);

// get youtube thumbnail from video url
function getThumbnail(url){
    return `https://img.youtube.com/vi/${url.split("v=")[1]}/hqdefault.jpg`;
}

export default function RegisterVideo() {
    const formCadastro = useForm({
        initialValues: {titulo:"", url:""}
    });
    const [formVisivel, setFormVisivel] = React.useState(false);

    return (
        <StyledRegisterVideo>
            <button className="add-video" onClick={() => setFormVisivel(true)}>
                +
            </button>
            {formVisivel
                ? (
                    <form onSubmit={(evento) => {
                        evento.preventDefault();
                        supabase.from("video").insert({
                            title: formCadastro.values.titulo,
                            url: formCadastro.values.url,
                            thumb:getThumbnail(formCadastro.values.url),
                            playlist:formCadastro.values.playlist,
                        })
                        .then((oqueveio) => {
                            console.log(oqueveio);
                        })
                        .catch((err) => {
                            console.log(err);
                        })

                        setFormVisivel(false);
                        formCadastro.clearForm();
                    }}>
                        <div>
                            <button type="button" className="close-modal" onClick={() => setFormVisivel(false)}>
                                X
                            </button>
                                <input 
                                    placeholder="URL"
                                    name="url"
                                    value={formCadastro.values.url} 
                                    onChange={formCadastro.handleChange}
                                />
                                <input 
                                    placeholder="Título do vídeo"
                                    name="titulo"
                                    value={formCadastro.values.titulo} 
                                    onChange={formCadastro.handleChange}
                                />                                
                                <input 
                                    placeholder="Playlist"
                                    name="playlist"
                                    value={formCadastro.values.playlist} 
                                    onChange={formCadastro.handleChange}
                                />
                                <img src={getThumbnail(formCadastro.values.url)} alt="Thumbnail do vídeo" />
                            <button type="submit">
                                Cadastrar
                            </button>
                        </div>                
                    </form>
    
                ):false
            }
        </StyledRegisterVideo>
    )
}