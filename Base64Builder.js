/*
 *
 * Based on webtoolkit.info's base64.js
 * 
 */

function Base64Builder() {
   this._valueThusFar = '';
   this._buffer = '';
}

Base64Builder._keyStr = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/=";

Base64Builder.prototype.update = function(inp) {
   
   inp = this._buffer + inp;

   var max = 0;

      for(var i = 0; i < inp.length; i+= 3)  {
         if (inp.length > i+2) {
            this.processTriplet(inp[i],inp[i+1],inp[i+2]);
         }
         max = i;
      }

   this._buffer = inp.substring(max);

}

Base64Builder.prototype.processTriplet = function(a,b,c) {
   this._valueThusFar += this._returnProcessedTriplet(a,b,c);
}

Base64Builder.prototype._returnProcessedTriplet = function(a,b,c) {
   var output, enc1, enc2, enc3, enc4;

   a = a.charCodeAt(0);
   if (b !== undefined) {
      b = b.charCodeAt(0);
      if (c !== undefined) {
         c = c.charCodeAt(0);
      }
   }

   enc1 = a >> 2;
   enc2 = ((a & 3) << 4) | (b >> 4);
   if (b !== undefined) {
      enc3 = ((b & 15) << 2) | (c >> 6);
      if (c !== undefined) {
         enc4 = c & 63;
      }
      else {
         enc4 = 64;
      }
   }
   else {
      enc3 = enc4 = 64;
   }

   print(enc1);


   output = Base64Builder._keyStr.charAt(enc1) + Base64Builder._keyStr.charAt(enc2) +
   Base64Builder._keyStr.charAt(enc3) + Base64Builder._keyStr.charAt(enc4);

   return output;
}

Base64Builder.prototype.toString = function() {
   if (this._buffer.length == 1) {
      return this._valueThusFar+this._returnProcessedTriplet(this._buffer[0]);
   }
   if (this._buffer.length == 2) {
      return this._valueThusFar+this._returnProcessedTriplet(this._buffer[0], this._buffer[1]);
   }
   return this._valueThusFar;
};

var b = new Base64Builder();
b.update("hello ");
b.update("there!");
print(b);
