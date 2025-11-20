import Image from 'next/image'
import salamanderImg from '@/public/salamander.jpg'
import binarizedImg from '@/public/binarized.png'
import DropDown from '@/app/components/imgCondition/DropDown';

export default function ProcessorStartCard() {
    return (
        <div className="container-card-starter">
            <div className="card-row">
                <div className="card-left">
                    <ul>
                        <li>Import Video <DropDown /></li>
                        <li>Color <input type="color" id="color" name="color"></input></li>
                        <li>Threshold <input type="range" min="1" max="100"></input></li>
                    </ul>
                </div>
                <div className="card-right">
                    {/* <img src= {salamanderImg} alt="Binarized Salamander Miku" /> */}
                    <Image src={salamanderImg} alt="Binarized Salamander Miku" />
                    <Image src={binarizedImg} alt="Binarized Salamander Miku" />
                </div>
            </div>

            <div className="button-lower">
                <button type="submit">START</button>
            </div>
        </div>
    )
}