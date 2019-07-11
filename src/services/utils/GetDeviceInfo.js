/**
 * Created by xiaoming on 2017/6/2.
 */
import DeviceInfo from 'react-native-device-info';
/**
 * 设备信息
 */
let GetDeviceInfo = {
    getDeviceInfo() {
        return {
            deviceUId: DeviceInfo.getUniqueID(),
            deviceM: DeviceInfo.getManufacturer(),
            deviceId: DeviceInfo.getDeviceId(),
            deviceSysName: DeviceInfo.getSystemName(),
            deviceVersion: DeviceInfo.getSystemVersion(),
            deviceBundleID: DeviceInfo.getBundleId(),
            deviceBundleNumber: DeviceInfo.getBuildNumber(),
            deviceAppVersion: DeviceInfo.getVersion(),
            deviceName: DeviceInfo.getDeviceName(),
            deviceModel: DeviceInfo.getModel()
        }
    }
}

export default GetDeviceInfo