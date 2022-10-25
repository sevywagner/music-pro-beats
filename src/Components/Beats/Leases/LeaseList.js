import Lease from "./Lease";
import styles from './../Css/Leases/lease-list.module.css';
import Card from "../../UI/Card";

const LeaseList = () => {
    return (
        <Card className={styles['lease-list']}>
            <Card className={styles.items}>
                <div className={styles.leases}>
                    <Lease 
                        title="Basic Lease" 
                        description="Comes with MP3 & Wav (Limited Usage, See Contract)"
                        price="25"
                    />
                    <Lease 
                        title="Premium Lease" 
                        description="Comes with MP3, Wav, and Wav Stems"
                        price="35"
                    />
                    <Lease 
                        title="Unlimited Lease" 
                        description="Exclusive benefits(unlimited usage & comes with all file types + stems) without exclusive ownership" 
                        price="60"
                    />
                </div>
            </Card>
        </Card>
    );
}

export default LeaseList;