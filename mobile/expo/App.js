import React from "react"

import {
  SafeAreaView,
  Text,
  View,
  ScrollView,
  TouchableOpacity,
  Linking
}
from "react-native"

export default function App(){

  const routes = [

    {
      title:"Executive Dashboard",
      url:"http:///executive-dashboard"
    },

    {
      title:"SOC Dashboard",
      url:"http:///soc-dashboard"
    },

    {
      title:"Workshop Operations",
      url:"http:///workshop-operations"
    },

    {
      title:"Expedition Dashboard",
      url:"http:///expedition-dashboard"
    },

    {
      title:"Mobile SOC",
      url:"http:///mobile-soc"
    },

    {
      title:"Operational Copilot",
      url:"http:///operational-copilot"
    }
  ]

  return (

    <SafeAreaView
      style={{
        flex:1,
        backgroundColor:"#0B1220"
      }}
    >

      <ScrollView
        style={{
          padding:24
        }}
      >

        <Text
          style={{
            color:"#FFFFFF",
            fontSize:34,
            fontWeight:"700",
            marginBottom:10
          }}
        >

          JustDefenders

        </Text>

        <Text
          style={{
            color:"#9CA3AF",
            marginBottom:30
          }}
        >

          Mobile Operational Platform

        </Text>

        {

          routes.map(

            (
              item,
              index
            ) => (

              <TouchableOpacity

                key={index}

                onPress={() => {

                  Linking.openURL(
                    item.url
                  )
                }}

                style={{

                  backgroundColor:"#18253A",

                  borderRadius:18,

                  padding:22,

                  marginBottom:18,

                  borderWidth:1,

                  borderColor:"#22324B"
                }}
              >

                <Text
                  style={{

                    color:"#E5E7EB",

                    fontSize:22,

                    fontWeight:"600"
                  }}
                >

                  {item.title}

                </Text>

                <Text
                  style={{
                    color:"#3B82F6",
                    marginTop:10
                  }}
                >

                  {item.url}

                </Text>

              </TouchableOpacity>
            )
          )
        }

      </ScrollView>

    </SafeAreaView>
  )
}