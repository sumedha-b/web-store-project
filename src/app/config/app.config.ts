export class AppConfig{

    public static BASE_ENDPOINT = 'http://localhost:4000/v3';
    public static LOGIN_ENDPOINT = AppConfig.BASE_ENDPOINT + '/login';
    public static PRODUCT_ENDPOINT = AppConfig.BASE_ENDPOINT + '/admin/products';
    public static VENDOR_ENDPOINT = AppConfig.BASE_ENDPOINT + '/admin/vendors';
    public static VENDOR_IMAGE_ENDPOINT = AppConfig.BASE_ENDPOINT +"/admin/vendor-image"
    public static VENDOR_BY_CODE = AppConfig.BASE_ENDPOINT +"/admin/vendor-by-code";
    public static ADVERTISEMENT_ENDPOINT = AppConfig.BASE_ENDPOINT +"/admin/advertisement";
    //public static IMAGE_ENDPOINT = AppConfig.PROFILES_ENDPOINT + '/images';
}