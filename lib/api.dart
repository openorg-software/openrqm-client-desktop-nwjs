library swagger.api;

import 'dart:async';
import 'dart:convert';
import 'package:http/browser_client.dart';
import 'package:http/http.dart';

part 'api_client.dart';
part 'api_helper.dart';
part 'api_exception.dart';
part 'auth/authentication.dart';
part 'auth/api_key_auth.dart';
part 'auth/oauth.dart';
part 'auth/http_basic_auth.dart';

part 'api/document_api.dart';
part 'api/documents_api.dart';
part 'api/element_api.dart';
part 'api/elements_api.dart';
part 'api/workspace_api.dart';
part 'api/workspaces_api.dart';

part 'model/document.dart';
part 'model/documents.dart';
part 'model/element.dart';
part 'model/elements.dart';
part 'model/workspace.dart';
part 'model/workspaces.dart';


ApiClient defaultApiClient = new ApiClient();
