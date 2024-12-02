// SPDX-License-Identifier: MIT

pragma solidity >=0.7.0 <0.9.0;

library Slugify {

    function generateSlug(string memory _title) internal pure returns (string memory) {
        bytes memory strBytes = bytes(_title);
        bytes memory result = new bytes(strBytes.length);
        
        for (uint i = 0; i < strBytes.length; i++) {
            bytes1 char = strBytes[i];

            if (char == 0x20) { // space
                result[i] = 0x2D; // hyphen (-)
            } else if (
                (char >= 0x30 && char <= 0x39) || // 0-9
                (char >= 0x41 && char <= 0x5A) || // A-Z
                (char >= 0x61 && char <= 0x7A)    // a-z
            ) {
                result[i] = char;
            } else {
                result[i] = 0x2D;
            }

        }

        return string(result);
    }
}
