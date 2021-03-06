import {
  child,
  get,
  getDatabase,
  limitToLast,
  orderByChild,
  query,
  ref,
} from 'firebase/database';
import React, {useEffect, useState} from 'react';
import {ScrollView, StyleSheet, Text, View} from 'react-native';
import {
  DoctorCategory,
  Gap,
  HomeProfile,
  NewsItem,
  RatedDoctor,
} from '../../components';
import {colors, fonts} from '../../utils';

const Doctor = ({navigation}) => {
  const [news, setNews] = useState([]);
  const [categoryDoctor, setCategoryDoctor] = useState([]);
  const [doctors, setDoctors] = useState([]);
  const dbRef = ref(getDatabase());

  useEffect(() => {
    //using parameter
    getDataNews('news');
    //without parameter
    getDataCategoryDoctor();
    getTopRatedDoctors();
  }, []);

  //parsing object to array
  const parseArray = listObject => {
    const data = [];
    Object.keys(listObject).map(key => {
      data.push({
        id: key,
        data: listObject[key],
      });
    });
    return data;
  };
  const getTopRatedDoctors = () => {
    const db = getDatabase();
    //craate variable first
    const topRatedDoctors = query(ref(db, 'doctors/'));
    //get data
    get(topRatedDoctors, orderByChild('rate'), limitToLast(3))
      .then(res => {
        if (res.exists()) {
          // console.log('rated doctor: ', res.val());
          if (res.val()) {
            const data = parseArray(res.val());
            // console.log('data hasil parse Rated Doctor: ', data);
            setDoctors(data);
          }
        } else {
          console.log('No data available');
        }
      })
      .catch(error => {
        console.error(error);
      });
  };

  const getDataNews = param => {
    get(child(dbRef, `${param}/`))
      .then(res => {
        if (res.exists()) {
          // console.log('ini data: ', res.val());
          if (res.val()) {
            setNews(res.val());
          }
        } else {
          console.log('No data available');
        }
      })
      .catch(error => {
        console.error(error);
      });
  };

  const getDataCategoryDoctor = () => {
    get(child(dbRef, `category_doctor/`))
      .then(res => {
        if (res.exists()) {
          if (res.val()) {
            setCategoryDoctor(res.val().data);
          }
        } else {
          console.log('No data available');
        }
      })
      .catch(error => {
        console.error(error);
      });
  };

  return (
    <View style={styles.page}>
      <View style={styles.content}>
        <ScrollView showsVerticalScrollIndicator={false}>
          <View style={styles.wrapperSection}>
            <Gap height={30} />
            <HomeProfile onPress={() => navigation.navigate('UserProfile')} />
            <Text style={styles.welcome}>
              Mau Konsultasi dengan siapa hari ini?
            </Text>
          </View>
          <View style={styles.wrapperScroll}>
            <ScrollView horizontal showsHorizontalScrollIndicator={false}>
              <View style={styles.category}>
                <Gap width={32} />
                {categoryDoctor.map(item => {
                  return (
                    <DoctorCategory
                      key={item.id}
                      category={item.category}
                      onPress={() => navigation.navigate('ChooseDoctor', item)}
                    />
                  );
                })}

                <Gap width={22} />
              </View>
            </ScrollView>
          </View>
          <View style={styles.wrapperSection}>
            <Text style={styles.sectionLabel}>Top Rated Doctors</Text>
            {doctors.map(doctor => {
              return (
                <RatedDoctor
                  key={doctor.id}
                  name={doctor.data.fullName}
                  desc={doctor.data.profession}
                  avatar={{uri: doctor.data.photo}}
                  onPress={() => navigation.navigate('DoctorProfile', doctor)}
                />
              );
            })}
            <Text style={styles.sectionLabel}>Good News</Text>
          </View>
          {news.map(item => {
            return (
              <NewsItem
                key={item.id}
                title={item.title}
                image={item.image}
                date={item.date}
              />
            );
          })}

          <Gap height={30} />
        </ScrollView>
      </View>
    </View>
  );
};

export default Doctor;

const styles = StyleSheet.create({
  page: {
    backgroundColor: colors.secondary,
    flex: 1,
  },
  content: {
    backgroundColor: colors.white,
    flex: 1,
    borderBottomLeftRadius: 20,
    borderBottomRightRadius: 20,
  },
  wrapperSection: {
    paddingHorizontal: 16,
  },
  welcome: {
    fontSize: 20,
    fontFamily: fonts.primary[600],
    color: colors.text.primary,
    marginTop: 30,
    marginBottom: 16,
    maxWidth: 219,
  },
  category: {
    flexDirection: 'row',
  },

  wrapperScroll: {
    marginHorizontal: -16,
  },
  sectionLabel: {
    fontSize: 16,
    fontFamily: fonts.primary[600],
    color: colors.text.primary,
    marginTop: 30,
    marginBottom: 16,
  },
});
