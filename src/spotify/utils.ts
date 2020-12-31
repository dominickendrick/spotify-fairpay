export const getCrypto = () => {
    //ie 11.x uses msCrypto
    return (window.crypto || (window as any).msCrypto) as Crypto;
  };
  
  export const getCryptoSubtle = () => {
    const crypto = getCrypto();
    //safari 10.x uses webkitSubtle
    return crypto.subtle || (crypto as any).webkitSubtle;
  };
  
  export const sha256 = async (s: string) => {
    const digestOp: any = getCryptoSubtle().digest(
      { name: "SHA-256" },
      new TextEncoder().encode(s)
    );
  
    // msCrypto (IE11) uses the old spec, which is not Promise based
    // https://msdn.microsoft.com/en-us/expression/dn904640(v=vs.71)
    // Instead of returning a promise, it returns a CryptoOperation
    // with a result property in it.
    // As a result, the various events need to be handled in the event that we're
    // working in IE11 (hence the msCrypto check). These events just call resolve
    // or reject depending on their intention.
    if ((window as any).msCrypto) {
      return new Promise((res, rej) => {
        digestOp.oncomplete = (e: any) => {
          res(e.target.result);
        };
  
        digestOp.onerror = (e: ErrorEvent) => {
          rej(e.error);
        };
  
        digestOp.onabort = () => {
          rej("The digest operation was aborted");
        };
      });
    }
  
    return await digestOp;
  };
  
  const urlEncodeB64 = (input: string) => {
    const b64Chars: { [index: string]: string } = { "+": "-", "/": "_", "=": "" };
    return input.replace(/[+/=]/g, (m: string) => b64Chars[m]);
  };
  
  // https://stackoverflow.com/questions/30106476/
  const decodeB64 = (input: string) =>
    decodeURIComponent(
      atob(input)
        .split("")
        .map((c) => {
          return "%" + ("00" + c.charCodeAt(0).toString(16)).slice(-2);
        })
        .join("")
    );
  
  export const urlDecodeB64 = (input: string) =>
    decodeB64(input.replace(/_/g, "/").replace(/-/g, "+"));
  
  export const bufferToBase64UrlEncoded = (input: number[] | Uint8Array) => {
    const ie11SafeInput = new Uint8Array(input);
    return urlEncodeB64(
      window.btoa(String.fromCharCode(...Array.from(ie11SafeInput)))
    );
  };

  // helper function to generate a random string
export const makeid = (length: number) => {
    var result = "";
    var characters =
      "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";
    var charactersLength = characters.length;
    for (var i = 0; i < length; i++) {
      result += characters.charAt(Math.floor(Math.random() * charactersLength));
    }
    return result;
  };
  
  // helper function to generate a random number
  export const getRandomInt = (min: number, max: number) => {
    min = Math.ceil(min);
    max = Math.floor(max);
    return Math.floor(Math.random() * (max - min + 1)) + min;
  };