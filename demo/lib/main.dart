import 'package:flutter/material.dart';

void main() {
  runApp(const MyApp());
}

class MyApp extends StatelessWidget {
  const MyApp({Key? key}) : super(key: key);

  // This widget is the root of your application.
  @override
  Widget build(BuildContext context) {
    return MaterialApp(
      debugShowCheckedModeBanner: false,
      title: 'Flutter Demo',
      theme: ThemeData(
        primarySwatch: Colors.green,
      ),
      home: const PageViewDemo(),
    );
  }
}

class PageViewDemo extends StatefulWidget {
  const PageViewDemo({Key? key}) : super(key: key);

  @override
  _PageViewDemoState createState() => _PageViewDemoState();
}

class _PageViewDemoState extends State<PageViewDemo> {
  late bool isFoods;
  late List<Widget> data;
  late PageController _pCon;
  @override
  void initState() {
    isFoods = true;
    data = [const Text("Potato")];
    _pCon = PageController();
    super.initState();
  }

  @override
  Widget build(BuildContext context) {
    return Scaffold(
      backgroundColor: Colors.white,
      appBar: AppBar(
        backgroundColor: Colors.white,
        elevation: 0,
        title: const Text(
          "Favorites",
          style: TextStyle(color: Colors.black, fontWeight: FontWeight.bold),
        ),
      ),
      body: Column(
        children: [
          Padding(
            padding: const EdgeInsets.symmetric(horizontal: 16),
            child: Row(
              children: [
                Expanded(
                  child: RoundedEndButton(
                    roundRight: false,
                    radius: 16,
                    isActive: isFoods,
                    onTap: () {
                      _pCon.animateToPage(0,
                          duration: const Duration(milliseconds: 100),
                          curve: Curves.bounceIn);
                    },
                    child: const Center(
                      child: Text("Foods"),
                    ),
                  ),
                ),
                Expanded(
                  child: RoundedEndButton(
                    roundRight: true,
                    radius: 16,
                    isActive: !isFoods,
                    onTap: () {
                      // if (mounted) {
                      //   setState(() {
                      //     isFoods = false;
                      //   });
                      // }
                      _pCon.animateToPage(1,
                          duration: const Duration(milliseconds: 100),
                          curve: Curves.bounceIn);
                    },
                    child: const Center(
                      child: Text("Recipes"),
                    ),
                  ),
                ),
              ],
            ),
          ),
          Expanded(
            child: PageView(
              controller: _pCon,
              // physics: const NeverScrollableScrollPhysics(),
              onPageChanged: (index) {
                if (mounted) {
                  setState(() {
                    isFoods = index == 0;
                  });
                }
              },
              children: const [FoodsScreen(), RecipesScreen()],
            ),
          ),
          // Expanded(
          //     child: isFoods ? const FoodsScreen() : const RecipesScreen()),
          const SizedBox(
              height: 51, child: Center(child: Text("Your Nav Stuff Here")))
        ],
      ),
    );
  }
}

class FoodsScreen extends StatefulWidget {
  const FoodsScreen({Key? key}) : super(key: key);

  @override
  _FoodsScreenState createState() => _FoodsScreenState();
}

class _FoodsScreenState extends State<FoodsScreen> {
  @override
  Widget build(BuildContext context) {
    return const Center(child: Text("Food"));
  }
}

class RecipesScreen extends StatefulWidget {
  const RecipesScreen({Key? key}) : super(key: key);

  @override
  _RecipesScreenState createState() => _RecipesScreenState();
}

class _RecipesScreenState extends State<RecipesScreen> {
  @override
  Widget build(BuildContext context) {
    return const Center(child: Text("Recipes"));
  }
}

class RoundedEndButton extends StatelessWidget {
  final Widget child;
  final EdgeInsets padding;
  final EdgeInsets margin;
  final double radius;
  final bool roundRight;
  final Function onTap;
  final bool isActive;
  const RoundedEndButton({
    required this.child,
    this.padding = const EdgeInsets.symmetric(vertical: 16),
    this.margin = EdgeInsets.zero,
    this.radius = 40,
    this.roundRight = true,
    this.isActive = false,
    required this.onTap,
    Key? key,
  }) : super(key: key);

  @override
  Widget build(BuildContext context) {
    return InkWell(
      onTap: () {
        onTap();
      },
      child: Container(
        padding: const EdgeInsets.symmetric(vertical: 16),
        decoration: BoxDecoration(
          color: isActive ? Colors.greenAccent : Colors.grey[300],
          borderRadius: roundRight
              ? BorderRadius.only(
                  topRight: Radius.circular(radius),
                  bottomRight: Radius.circular(radius))
              : BorderRadius.only(
                  topLeft: Radius.circular(radius),
                  bottomLeft: Radius.circular(radius),
                ),
        ),
        child: child,
      ),
    );
  }
}
