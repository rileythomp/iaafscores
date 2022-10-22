import json
import logging
import math

coeffs = {'100m': {'a': 22.72906633363137, 'b': 17.073559322033887, 'c': 2.0303898521671435}, '200m': {'a': 5.149109281541434, 'b': 35.470909090909075, 'c': 1.996413499316843}, '300m': {'a': 1.857078536461313, 'b': 57.158181818181866, 'c': 1.996413499316848}, '400m': {'a': 1.0189019287307088, 'b': 78.99625850340155, 'c': 2.000526780477403}, '500m': {'a': 0.590148761810476, 'b': 103.96809768637517, 'c': 1.9979678954052702}, '110mH': {'a': 7.937642625847985, 'b': 25.75120370370371, 'c': 1.9887517586426298}, '400mH': {'a': 0.5694488391505395, 'b': 95.3396039603959, 'c': 1.9907416508621754}, '4x100m': {'a': 1.1855964698352564, 'b': 69.60857142857141, 'c': 2.010051627097967}, '4x200m': {'a': 0.2989860214300753, 'b': 143.978899082569, 'c': 1.999041172632535}, '4x400m': {'a': 0.050278191394837, 'b': 334.03988653555274, 'c': 2.0007465393640316}, '600m': {'a': 0.3740561737086267, 'b': 129.6254297693921, 'c': 2.0064874029170836}, '800m': {'a': 0.1987795058284999, 'b': 181.9703592814372, 'c': 1.9992719430334422}, '1000m': {'a': 0.11247417150443936, 'b': 237.48847801578327, 'c': 1.99967841331642}, '1500m': {'a': 0.040719119881219616, 'b': 384.98442333785613, 'c': 1.999738387776432}, 'Mile': {'a': 0.03531648044112377, 'b': 414.92337114051793, 'c': 1.9989602259468897}, '2000m': {'a': 0.021782788397628004, 'b': 528.0070377733591, 'c': 2.000209585682385}, '2000mSC': {'a': 0.010267470893475975, 'b': 659.9328819326299, 'c': 1.9994345577187678}, '3000m': {'a': 0.008156709949972512, 'b': 839.9832837181051, 'c': 1.9998743012759241}, '3000mSC': {'a': 0.006993315265662106, 'b': 1007.3157932948961, 'c': 1.9304926218966352}, '2Miles': {'a': 0.007020253397003393, 'b': 904.8290547404072, 'c': 2.0002029090957367}, '5000m': {'a': 0.002790825141811829, 'b': 1439.8439734042533, 'c': 1.9993589114213435}, '10000m': {'a': 0.0005232995451990663, 'b': 3150.0875117479336, 'c': 2.0001668569965223}, '5km': {'a': 0.0025943151653944055, 'b': 1441.2857142857142, 'c': 2.01005162709797}, '10km': {'a': 0.0005444610900944085, 'b': 3146.607692307692, 'c': 1.995434280257242}, '15km': {'a': 0.00021411339879220847, 'b': 4868.930693069307, 'c': 2.001139792783245}, '10Miles': {'a': 0.00019398087342133706, 'b': 5245.16894977169, 'c': 1.994524358011752}, '20km': {'a': 0.00010627295502532476, 'b': 6705.687719298246, 'c': 2.0023315574027687}, 'HalfMarathon': {'a': 8.711301721490519e-05, 'b': 7151.5921052631575, 'c': 2.0093936895701}, '25km': {'a': 6.26195817142983e-05, 'b': 8723.211081794196, 'c': 1.998176844455701}, '30km': {'a': 3.4781185289824266e-06, 'b': 11321.009456264776, 'c': 2.257552493644194}, 'Marathon': {'a': 1.618065774847371e-05, 'b': 16204.083333333334, 'c': 2.001717435565067}, '100km': {'a': 1.768664428724596e-06, 'b': 48597.31515422441, 'c': 1.9998135516110527}}

def getResponse(code, msg):
    return {
        'statusCode': code,
        'body': json.dumps(msg)
    }

def lambda_handler(event, context):
    logger = logging.getLogger()
    logger.setLevel(logging.INFO)
    
    logger.info('RECEIVED EVENT')
    logger.info(event)
    
    if 'headers' not in event:
        logger.info('missing headers')
        return getResponse(400, 'Invalid request.')
    
    if 'queryStringParameters' not in event:
        logger.info('missing queryStringParameters')
        return getResponse(400, 'Invalid request.')
        
    
    if 'race' not in event['queryStringParameters']:
        logger.info('missing race')
        return getResponse(400, 'Must give a race.')
        
    if 'time' not in event['queryStringParameters'] and 'points' not in event['queryStringParameters']:
        logger.info('missing time or points')
        return getResponse(400, 'Must give one of time or points.')
        
    if 'time' in event['queryStringParameters'] and 'points' in event['queryStringParameters']:
        logger.info('both time and points')
        return getResponse(400, 'Must give one of time or points.')
    
    race = event['queryStringParameters']['race']
    
    a = coeffs[race]['a']
    b = coeffs[race]['b']
    c = coeffs[race]['c']
        
    if 'time' in event['queryStringParameters']:
        t = float(event['queryStringParameters']['time'])
        if t < 0:
            logger.info('received time less than 0')
            return getResponse(400, 'Time must be greater than 0.')
        try: 
            p = math.floor(a*(b-t)**c)
        except Exception:
            p = 0
            logger.info('unexpected error calculating points')
            return getResponse('Unexpected error calculating points.')
        if p > 1400:
            logger.info('points greater than 1400')
            return getResponse(400, 'Invalid time, points over 1400')
            
        retval = p
    
    if 'points' in event['queryStringParameters']:
        p = int(event['queryStringParameters']['points'])
        if p < 0 or p > 1400:
            logger.info('received points outside 0-1400')
            return getResponse(400, 'Points must be between 0-1400.')
        try:
            t  = round(b - (p/a)**(1/c), 2)
        except Exception:
            t = 'unexpected error calculating time'
            logger.info('unexpected error calculating time')
            return getResponse(500, 'Unexpected error calculating time.')
        retval = t
    
    return getResponse(200, retval)