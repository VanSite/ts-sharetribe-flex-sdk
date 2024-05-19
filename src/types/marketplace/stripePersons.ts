import { ApiParameter, ExtraParameter, UUID } from '../sharetribe';

export type StripePersonsEndpoints = 'create'

export interface StripePersons {
  id: UUID,
  type: 'stripePerson',
  attributes: {
    stripePersonId: string,
  }
}

export interface StripePersonsParameter extends ApiParameter {
}

export interface StripePersonsCreateParameter extends StripePersonsParameter {
  personToken: string
}

type ExpandReturnType<EP> =
  EP extends { expand: true } ? StripePersons :
    EP extends { expand: false } ? Omit<StripePersons, 'attributes'> :
      Omit<StripePersons, 'attributes'>

type ExtraParameterType = ExtraParameter | undefined

type DataType<
  E extends StripePersonsEndpoints,
  EP extends ExtraParameterType
> =
  E extends 'create' ? ExpandReturnType<EP> : never

export type StripePersonsResponse<
  E extends StripePersonsEndpoints,
  EP extends ExtraParameterType = undefined
> = {
  data: DataType<E, EP>
}
