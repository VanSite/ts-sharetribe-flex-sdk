/**
 * @fileoverview Provides the StockReservation class for managing stock reservations in the Sharetribe Integration API.
 * This class allows retrieving details about stock reservations.
 *
 * For more details, refer to the Integration API documentation:
 * https://www.sharetribe.com/api-reference/integration.html#stock-reservations
 */

import { AxiosInstance, AxiosResponse } from 'axios';
import IntegrationApi from './index';
import { StockReservationShowParameter, StockReservationsResponse } from '../../types/marketplace/stockReservations';

/**
 * Class representing the Stock Reservations API.
 *
 * The Stock Reservations API provides methods to manage stock reservations for marketplace resources.
 */
class StockReservation {
  private readonly endpoint: string;
  private readonly axios: AxiosInstance;
  private readonly headers: Record<string, string>;

  /**
   * Creates an instance of the StockReservation class.
   *
   * @param {IntegrationApi} api - The Integration API instance providing configuration and request handling.
   */
  constructor(api: IntegrationApi) {
    this.endpoint = api.endpoint + '/stock_reservations';
    this.axios = api.axios;
    this.headers = api.headers;
  }

  /**
   * Retrieves details about a specific stock reservation.
   *
   * @template P
   * @param {P & StockReservationShowParameter} params - The parameters to identify the stock reservation.
   * @returns {Promise<AxiosResponse<StockReservationsResponse<'show', P>>>} - A promise resolving to the stock reservation details.
   *
   * @example
   * const response = await integrationSdk.stockReservations.show({
   *   id: 'reservation-id',
   * });
   *
   * const reservationDetails = response.data;
   */
  async show<P extends StockReservationShowParameter>(
    params: P
  ): Promise<AxiosResponse<StockReservationsResponse<'show', P>>> {
    return this.axios.get<StockReservationsResponse<'show', P>>(`${this.endpoint}/show`, {
      ...this.headers,
      params,
    });
  }
}

export default StockReservation;
