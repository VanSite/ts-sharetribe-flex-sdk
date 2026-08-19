/**
 * @fileoverview Provides the StockReservation class for managing stock reservations in the Sharetribe Integration API.
 * This class allows retrieving details about stock reservations.
 *
 * For more details, refer to the Integration API documentation:
 * https://www.sharetribe.com/api-reference/integration.html#stock-reservations
 */

import type {HttpClient, HttpResponse} from "../../types";
import type IntegrationApi from "./index";
import {StockReservationShowParameter, StockReservationsResponse,} from "../../types";

/**
 * Class representing the Stock Reservations API.
 *
 * The Stock Reservations API provides methods to manage stock reservations for marketplace resources.
 */
class StockReservations {
  private readonly endpoint: string;
  private readonly httpClient: HttpClient;
  private readonly headers: Record<string, string>;

  /**
   * Creates an instance of the StockReservation class.
   *
   * @param {IntegrationApi} api - The Integration API instance providing configuration and request handling.
   */
  constructor(api: IntegrationApi) {
    this.endpoint = api.endpoint + "/stock_reservations";
    this.httpClient = api.httpClient;
    this.headers = api.headers;
  }

  /**
   * Retrieves details about a specific stock reservation.
   *
   * @template P
   * @param {P & StockReservationShowParameter} params - The parameters to identify the stock reservation.
   * @returns {Promise<HttpResponse<StockReservationsResponse<'show', P>>>} - A promise resolving to the stock reservation details.
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
  ): Promise<HttpResponse<StockReservationsResponse<"show", P, {expand: true}>>> {
    return this.httpClient.get(`${this.endpoint}/show`,
      {headers: this.headers, params}
    );
  }
}

export default StockReservations;
