//
//  MILColorSelectorView.swift
//  MILUIDeveloper
//
//  Created by Ruslan Ardashev on 7/8/15.
//  Copyright (c) 2015 IBM. All rights reserved.
//

import UIKit
import WebKit


// MARK: Constants
extension ____MILColorSelectorView {
    
    public class Constants {
    
        
    
    }
    
}


// MARK: Properties & Init
public class ____MILColorSelectorView: WKWebView {
    
    let colorSelectorHTML = "<p>Hai.</p><color-selector name=\"myColor\" color-text=\"Color\" color-options=\"[{color: 'Red', hexColor: '#F00'}]\">oi</color-selector>"
    
//    let colorSelectorHTML = "<p>Hai.</p><color-selector name=\"myColor\" color-text=\"Color\" color-options=\"[{color: 'Red', hexColor: '#F00'}]\" color-selected=\"func(color)\">oi</color-selector>"

    
    override init(frame: CGRect, configuration: WKWebViewConfiguration) {
        
        super.init(frame: frame, configuration: configuration)
        
        println(self.configuration.userContentController)
        
        let wkUserScriptInjectionTime = WKUserScriptInjectionTime.AtDocumentEnd
        let script = WKUserScript(source: "color-selector.js", injectionTime: wkUserScriptInjectionTime, forMainFrameOnly: false)
        self.configuration.userContentController.addUserScript(script)
        
        self.loadHTMLString(colorSelectorHTML, baseURL: nil)
        
    }
    
}
