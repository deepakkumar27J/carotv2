import { Rota } from "./rota-data";

export default function rotaList({rotas}:{rotas:Rota[]}){
    return (
        <div>
            {rotas.map((rota) => (
                <div key={rota.day.toLocaleDateString()}>
                    <h2>Your Day</h2>
                    <p>Today {rota.day.toLocaleDateString()}</p>
                </div>
            ))}
        </div>
    )
}