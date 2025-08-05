import DeviceInfomation from './components/DetailDevice/DeviceInfomation';
import ElectricityComsumption from './components/DetailDevice/ElectricityComsumption';

const DetailDevice = () => {
  return (
    <div className='flex flex-col gap-8'>
      <DeviceInfomation />
      <ElectricityComsumption />
    </div>
  );
};

export default DetailDevice;
