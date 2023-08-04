import AdvertsService from "../service/crud/AdvertsService";
import AdvertsServiceArray from "../service/AdvertsServiceArray";
import AdvertsDataProcessor from "../service/AdvertsDataProcessor";
export const providerService: AdvertsServiceArray = new AdvertsServiceArray();
export const advertsService: AdvertsService = new AdvertsDataProcessor(providerService)