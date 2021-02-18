<template>
  <div class="flex-start-center">
    <div style="width: 50%">
      <div>
        <textarea ref="textarea" />
      </div>
    </div>
    <div style="width: 50%"></div>
  </div>
</template>

<script>
import CodeMirror from 'codemirror'
// 核心样式
import 'codemirror/lib/codemirror.css'
// 引入主题后还需要在 options 中指定主题才会生效
import 'codemirror/theme/cobalt.css'

// 需要引入具体的语法高亮库才会有对应的语法高亮效果
// codemirror 官方其实支持通过 /addon/mode/loadmode.js 和 /mode/meta.js 来实现动态加载对应语法高亮库
// 但 vue 貌似没有无法在实例初始化后再动态加载对应 JS ，所以此处才把对应的 JS 提前引入
import 'codemirror/mode/javascript/javascript.js'
import 'codemirror/mode/css/css.js'
import 'codemirror/mode/xml/xml.js'
import 'codemirror/mode/clike/clike.js'
import 'codemirror/mode/markdown/markdown.js'
import 'codemirror/mode/python/python.js'
import 'codemirror/mode/r/r.js'
import 'codemirror/mode/shell/shell.js'
import 'codemirror/mode/sql/sql.js'
import 'codemirror/mode/swift/swift.js'
import 'codemirror/mode/vue/vue.js'
import x2js from 'x2js'
export default {
  data() {
    return {
      editor: null,
      value: `<?xml version="1.0" encoding="UTF-8"?>
                <xs:schema xmlns:xs="http://www.w3.org/2001/XMLSchema" elementFormDefault="qualified" attributeFormDefault="unqualified" version="3.0.0">
                  <xs:element name="Application">
                    <xs:complexType>
                      <xs:sequence>
                        
                        <xs:element ref="PbocReport" minOccurs="0" maxOccurs="unbounded"/>
                        <xs:element ref="DecisionResponse" minOccurs="0"/>
                        <xs:element ref="ProcessingHistory" minOccurs="0"/>
                        <xs:element ref="MessageList" minOccurs="0"/>
                        
                      </xs:sequence>
                      <xs:attribute name="DecisionArea" type="xs:string" use="optional"/>
                      <xs:attribute name="RandomDigit" type="xs:integer" use="optional"/>
                      <xs:attribute name="ApplicationDate" type="xs:date" use="optional"/>
                      <xs:attribute name="ApplicationNumber" type="xs:string" use="optional"/>
                      <xs:attribute name="CallType" type="xs:string" use="optional"/>
                      <xs:attribute name="CallRound" type="xs:string" use="optional"/>
                    </xs:complexType>
                  </xs:element>
                  <xs:element name="ShareAndDebtSum">
                    <xs:complexType>
                      <xs:attribute name="ShareAndDebtCD" type="xs:string" use="optional"/>
                      <xs:attribute name="FinanceCorpCount" type="xs:integer" use="optional"/>
                      <xs:attribute name="FinanceOrgCount" type="xs:integer" use="optional"/>
                      <xs:attribute name="AccountCount" type="xs:integer" use="optional"/>
                      <xs:attribute name="CreditLimit" type="xs:double" use="optional"/>
                      <xs:attribute name="MaxCreditLimitPerOrg" type="xs:double" use="optional"/>
                      <xs:attribute name="MinCreditLimitPerOrg" type="xs:double" use="optional"/>
                      <xs:attribute name="Balance" type="xs:double" use="optional"/>
                      <xs:attribute name="UsedCreditLimit" type="xs:double" use="optional"/>
                      <xs:attribute name="Latest6MonthUsedAvgAmount" type="xs:double" use="optional"/>
                    </xs:complexType>
                  </xs:element>
                  <xs:element name="GuaranteeSum">
                    <xs:complexType>
                      <xs:attribute name="Count" type="xs:integer" use="optional"/>
                      <xs:attribute name="Amount" type="xs:double" use="optional"/>
                      <xs:attribute name="Balance" type="xs:double" use="optional"/>
                    </xs:complexType>
                  </xs:element>
                  
                  <xs:element name="Message">
                    <xs:complexType>
                      <xs:sequence>
                        <xs:element name="Description" type="xs:string" minOccurs="0"/>
                        <xs:element name="DetailedDescription" type="xs:string" minOccurs="0"/>
                        <xs:element name="Resolution" type="xs:string" minOccurs="0"/>
                      </xs:sequence>
                      <xs:attribute name="MessageNumber" type="xs:integer" use="optional"/>
                      <xs:attribute name="SeverityCode" type="xs:integer" use="optional"/>
                    </xs:complexType>
                  </xs:element>
                </xs:schema>` ,
          json: [
            {
              a: 123,
              b: 3123
            },
            {
              u: 123
            }
          ],
          x2js: new x2js()
    }
  },
  mounted() {
    this.editor = CodeMirror.fromTextArea(this.$refs.textarea, {
      mode: "text/xml",
      foldGutter: true,
      gutters: ["CodeMirror-linenumbers", "CodeMirror-foldgutter"],
      lineNumbers: true
    })
    this.editor.setValue(this.value)
    this.editor.setSize('auto', 600)
    console.log(this.x2js.xml2js(this.value))
    console.log(this.x2js.js2xml(this.json))
  },
  methods: {
    
  }
}
</script>

<style lang="scss" scoped>
  
</style>
