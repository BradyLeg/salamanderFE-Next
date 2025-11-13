import salamanderImg from '../assets/salamander.jpg'

export default function ProcessorStartCard(){
    return(
        <div className="container-card-starter">
            <div className="card-row">
                <div className="card-left">
                <ul>
                    <li>Import Video</li>
                    <li>Color</li>
                    <li>Threshold</li>
                </ul>
                </div>
                <div className="card-right">
                    <img src={salamanderImg} alt="Binarized Salamander Miku" />
                </div>
            </div>

            <div className="button-lower">
                <button type="submit">START</button>
            </div>
        </div>
    )
}