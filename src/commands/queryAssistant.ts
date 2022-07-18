/*
 * Copyright Amazon.com, Inc. or its affiliates. All Rights Reserved.
 * SPDX-License-Identifier: Apache-2.0
 */

import { Command } from './command';
import { WisdomClientResolvedConfig } from '../wisdomClient';
import { HttpRequest } from '../httpRequest';
import { QueryAssistantRequest, QueryAssistantResponse } from '../types/models';
import { ClientMethods } from '../types/clientMethods';
import { InvokeFunction } from '../types/command';
import { HttpResponse, HttpHandlerOptions } from '../types/http';

export interface QueryAssistantInput extends QueryAssistantRequest {}

export interface QueryAssistantOutput extends QueryAssistantResponse {}

export class QueryAssistant extends Command<
  QueryAssistantInput,
  QueryAssistantOutput,
  WisdomClientResolvedConfig
> {
  readonly clientMethod: ClientMethods;

  constructor(readonly clientInput: QueryAssistantInput) {
    super();
    this.clientMethod = ClientMethods.QueryAssistant;
  }

  resolveRequestHandler(
    configuration: WisdomClientResolvedConfig,
    options: HttpHandlerOptions,
  ): InvokeFunction<HttpResponse<QueryAssistantOutput>> {
    const { requestHandler } = configuration;
    return () => requestHandler.handle(this.serialize(configuration), options || {});
  }

  serialize(configuration: WisdomClientResolvedConfig): HttpRequest {
    const { assistantId, queryText } = this.clientInput;

    if ((assistantId === undefined) || !assistantId.length) {
      throw new Error('Invalid assistantId.');
    }

    if ((queryText === undefined) || !queryText.length) {
      throw new Error('Invalid queryText.');
    }

    return super.serialize(configuration);
  }
}
