from flask import request, Response
from datetime import datetime
import json
import pendulum
import decimal


# timezone doesn't implement yet
def now():
    return pendulum.now()


def get_parameter(param):
    req_list = request.get_json()

    if req_list is None:
        return None
    
    if param not in req_list:
        return None
    
    return request.get_json().get(param)


def dict_to_object(_dict, _class):
    if type(_dict) is not dict:
        return _dict

    obj = _class()

    for key, val in obj:
        if key in _dict:
            setattr(obj, key, _dict[key])

    return obj


def object_to_dict(_obj):
    if _obj is None:
        return None

    return dict(_obj)


def objects_to_dict(_list):
    i = 0
    for obj in _list:
        _list[i] = dict(obj)
        i += 1

    return _list


class JsonEncoder(json.JSONEncoder):

    # to prevent unserializable object
    def default(self, obj):
        if isinstance(obj, datetime):
            # 2018-03-14T08:08:37+00:00
            return pendulum.instance(obj).to_iso8601_string()
        if isinstance(obj, decimal.Decimal):
            return float(obj)

        return json.JSONEncoder.default(self, obj)


class EasyResponse:

    CODE_SUCCESS = 200

    def __init__(self, data=None):
        self.data = data
        self.code = self.CODE_SUCCESS
        self.message = 'success'
        self.status = {'code': self.code, 'message': self.message}

    def __iter__(self):
        yield 'data', self.data
        yield 'status', self.status
    
    def get_json_response(self):
        return Response(json.dumps(dict(self), cls=JsonEncoder), mimetype='application/json')
